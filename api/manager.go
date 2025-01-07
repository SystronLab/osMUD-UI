package main

import (
	"io"
	"net/http"
	"net/url"
	"time"

	"github.com/LouisHatton/MUD-UI/internal/dhcp"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/render"
	"go.uber.org/zap"
)

func (api *API) GetMudFile(w http.ResponseWriter, r *http.Request) {
	macAddressParam := chi.URLParam(r, "macAddress")
	macAddressDecoded, err := url.QueryUnescape(macAddressParam)
	if err != nil {
		api.l.Error("unable to escape url parameter", zap.Error(err))
		render.Render(w, r, ErrBadRequest(err))
		return
	}

	mudFile, err := api.mudManager.Get(macAddressDecoded)
	if err != nil {
		api.l.Error("error fetching record", zap.Error(err))
		render.Render(w, r, ErrInternalServerError(err))
		return
	}
	if mudFile == nil {
		api.l.Warn("requested record does not exist", zap.String("macAddress", macAddressDecoded))
		render.Render(w, r, ErrNotFound())
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/mud+json")
	w.Write(mudFile)
}

func (api *API) SetMudFile(w http.ResponseWriter, r *http.Request) {
	macAddressParam := chi.URLParam(r, "macAddress")
	macAddressDecoded, err := url.QueryUnescape(macAddressParam)
	if err != nil {
		api.l.Error("unable to escape url parameter", zap.Error(err))
		render.Render(w, r, ErrBadRequest(err))
		return
	}

	mudRecord, err := api.osMudReader.GetOne(macAddressDecoded)
	if err != nil {
		api.l.Warn("osmud record for macAddress does not exist", zap.Error(err))
		render.Render(w, r, ErrNotFound())
		return
	}

	body, err := io.ReadAll(r.Body)
	if err != nil {
		api.l.Error("unable to decode request body", zap.Error(err))
		render.Render(w, r, ErrInternalServerError(err))
		return
	}

	err = api.mudManager.Set(macAddressDecoded, body)
	if err != nil {
		api.l.Error("error setting data", zap.Error(err))
		render.Render(w, r, ErrInternalServerError(err))
		return
	}

	event := dhcp.Event{
		Date:       time.Now(),
		Action:     dhcp.DeleteEvent,
		MacAddress: mudRecord.MacAddress,
		Ip:         mudRecord.Ip,
		Hostname:   mudRecord.Hostname,
		MudUrl:     "http://localhost:" + api.port + "/manager/" + macAddressParam + "/mud",
	}

	api.dhcpEvents.AddEvent(&event)
	event.Action = dhcp.NewEvent
	api.dhcpEvents.AddEvent(&event)

	w.WriteHeader(http.StatusOK)
}
