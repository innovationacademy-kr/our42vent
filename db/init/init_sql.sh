#!bin/bash

echo "DB 테이블을 생성합니다"
echo "mysql 유저명을 입력하세요"
read user
echo "mysql 유저 비밀번호를 입력하세요"
read -s passwd
echo "사용하고자 하는 database를 입력하세요"
read DATABASE

echo -e "\n"
dbcheck=$(echo "use $DATABASE")

mysql -u$user -p$passwd -e "$dbcheck"
if [ $? -ne 0 ]; then
	echo "ERROR : 입력한 유저정보 및 db를 확인해주세요"
	exit 1
fi

mysql -u$user -p$passwd $DATABASE < create_table_user.sql
if [ $? -eq 0 ]; then
	echo "user table을 만드는데 성공하였습니다"
else
	echo "user table이 이미 존재하는지 확인해주세요"
fi
mysql -u$user -p$passwd $DATABASE < create_table_event.sql
if [ $? -eq 0 ]; then
	echo "event table을 만드는데 성공하였습니다"
else
	echo "event table이 이미 존재하는지 확인해주세요"
fi
mysql -u$user -p$passwd $DATABASE < create_table_my_event.sql
if [ $? -eq 0 ]; then
	echo "my_event table을 만드는데 성공하였습니다"
else
	echo "my_event table이 이미 존재하는지 확인해주세요"
fi
mysql -u$user -p$passwd $DATABASE < insert_intra.sql
if [ $? -eq 0 ]; then
	echo "인트라 id 데이터를 넣는데  성공하였습니다"
else
	echo "인트라 id 데이터가 이미 존재하는지 확인해주세요"
fi
