#!/bin/bash
clear
cat ~/324260/stocks.txt > /dev/null 2> /dev/null
if [ "$?" = 1 ] 
then
	touch ~/324260/stocks.txt
	echo -e "File did not exist so it was created.\n"
fi
echo "Enter one or more stock ticker symbols (press <ctrl-d> when finished):"
cat >> ~/324260/stocks.txt
echo -ne "\nPress any key to continue: "
read -n1
clear
