split --lines=1100 ./texte.txt arq

for f in arq*
do
  mv $f  ${f}.txt
done