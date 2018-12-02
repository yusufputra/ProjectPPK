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

create table sewa(
	idSewa int identity not null primary key,
	idUser int not null foreign key references userAdmin(idUser),
	idBarang int not null foreign key references Barang(idBarang),
	namaBarang varchar(100),
	tanggalSewa datetime,
	batasSewa datetime
)

alter table sewa
	add constraint TS_swa default getdate() for tanggalSewa

alter table sewa
	add username varchar(32)

insert into sewa(idUser,idBarang,namaBarang,batasSewa) values (1,5,'Hamok',getdate())
update sewa set username = 'acil' where idSewa = 2

select * from sewa

delete from sewa where idSewa = 3