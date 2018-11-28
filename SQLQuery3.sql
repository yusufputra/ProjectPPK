create table userAdmin(
	idUser int identity not null primary key,
	username varchar(32) not null,
	password varchar(100) not null
)

select * from userAdmin

create table Barang(
	idBarang int identity not null primary key,
	idUser int not null foreign key references useradmin(idUser),
	namaBarang varchar(100),
	stokBarang int
)

delete from Barang

insert into Barang(idUser, namaBarang, stokBarang, username) values
(1,'Hamok',5, 'acil'),
(1,'Tenda',7, 'acil'),
(1,'Selimut',2, 'acil'),
(1,'Lampu Teplok',3, 'acil')

alter table Barang
	add username varchar(32) not null

select * from Barang