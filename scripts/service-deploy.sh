#!/bin/bash

if [[ "$1" == "master" ]]; then
	echo
	echo Deploying Senti.Act Game Engine Framework $1 ...
	rsync -r --quiet $2/ deploy@rey.webhouse.net:/srv/nodejs/senti/act/game-engine/production
	echo
	echo Restarting Senti.Act Game Engine Framework service: $1 ...
	# ssh deploy@rey.webhouse.net 'sudo /srv/nodejs/senti/act/game-engine/production/registerservice-production'
	ssh deploy@rey.webhouse.net 'sudo /srv/nodejs/senti/act/game-engine/production/scripts/service-restart.sh master'
	echo
	echo Deployment to Senti.Act Game Engine Framework $1 and restart done!
	exit 0
fi

if [[ "$1" == "dev" ]]; then
	echo
	echo Deploying Senti.Act Game Engine Framework $1 ...
	rsync -r --quiet $2/ deploy@rey.webhouse.net:/srv/nodejs/senti/act/game-engine/development
	echo
	echo Restarting Senti.Act Game Engine Framework service: $1 ...
	# ssh deploy@rey.webhouse.net 'sudo /srv/nodejs/senti/act/game-engine/development/registerservice-development'
	ssh deploy@rey.webhouse.net 'sudo /srv/nodejs/senti/act/game-engine/development/scripts/service-restart.sh dev'
	echo
	echo Deployment to Senti.Act Game Engine Framework $1 and restart done!
	exit 0
fi