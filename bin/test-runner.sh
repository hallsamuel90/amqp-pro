#!/bin/sh

sudo docker-compose up -d

jest

sudo docker-compose down