# Makefile to send this project to Szam
SHELL=/usr/bin/env /bin/bash

all:	send

send:	send_zamok
send_zamok:
	CP --exclude=.ipynb_checkpoints --exclude=.git ./ ${Szam}publis/Free-dictionnaries-for-Pictionnary.git

exemple_fr_10:
	cat dictionnaire_pictionnary_francais.txt | shuf | head -n10

compile_fr:
	cat src/*_francais.txt | sort | uniq > dist/dictionnaire_pictionnary_francais.txt

compile_en:
	cat src/*_english.txt | sort | uniq > dist/dictionnary_pictionnary_english.txt

webserver:
	python3 -m http.server
