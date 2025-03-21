package main

import (
	"net/http"
	"net/url"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/render"
	"go.uber.org/zap"
)

func (api *API) GetAllOsMudEntries(w http.ResponseWriter, r *http.Request) {
	entries, err := api.osMudReader.ReadAll()
	if err != nil {
		api.l.Error("error fetching all records", zap.Error(err))
		render.Render(w, r, ErrInternalServerError(err))
		return
	}

	render.JSON(w, r, entries)
}

func (api *API) GetOsMudEntry(w http.ResponseWriter, r *http.Request) {
	macAddressParam := chi.URLParam(r, "macAddress")
	macAddressDecoded, err := url.QueryUnescape(macAddressParam)
	if err != nil {
		api.l.Error("unable to escape url parameter", zap.Error(err))
		render.Render(w, r, ErrBadRequest(err))
		return
	}

	entry, err := api.osMudReader.GetOne(macAddressDecoded)
	if err != nil {
		api.l.Error("error fetching record", zap.Error(err))
		render.Render(w, r, ErrInternalServerError(err))
		return
	}
	if entry == nil {
		api.l.Warn("requested record does not exist", zap.String("macAddress", macAddressDecoded))
		render.Render(w, r, ErrNotFound())
		return
	}

	render.JSON(w, r, entry)
}
