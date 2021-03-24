if [ -n "$1" ]
then
	comment="$1"
else
	comment=$(date '+%d.%m.%Y')
fi

git add .
git commit -m "$comment"
git push origin master

echo -e "Успешно отправлено"