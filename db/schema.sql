drop database if exists employee_db;
create database employee_db;
use employee_db;
create table department(
id int auto_increment not null primary key, 
name varchar(30) unique not null
);

create table role(
id int auto_increment not null primary key, 
title varchar(30) unique not null, 
salary decimal unsigned not null,
  department_id INT UNSIGNED NOT NULL,
  INDEX dep_ind (department_id)
);

create table employee(
id int auto_increment not null primary key, 
first_name varchar(30) not null,
last_name varchar(30) not null, 
role_id int not null, 
  manager_id INT UNSIGNED,
  INDEX man_ind (manager_id)
);
