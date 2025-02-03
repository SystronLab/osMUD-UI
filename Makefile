
BUILD_DIR = bin

all: dhcp_mock.build api.build

dhcp_mock.build:
	env CC=arm-linux-gnueabi-gcc CGO_ENABLED=0 GOOS=linux GOARCH=arm GOARM=7  \
                go build -o ${BUILD_DIR}/dhcp_mock -ldflags "-linkmode 'internal' -extldflags '-static'"\
                -tags sqlite_omit_load_extension ./tools/dhcp_mock

api.build:
	go build -o ${BUILD_DIR}/api ./api

clean:
	mkdir -p ${BUILD_DIR}
	rm -r ${BUILD_DIR}
