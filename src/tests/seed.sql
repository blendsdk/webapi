insert into sys_user (username,password,email)
values ('admin','$2y$12$TY3lMdKzS.JI308lBfQ9hOF8YCBPiXfyIahlCSbl96/bg6kyRtKtG','admin@example.com');

insert into sys_user (username,password,email)
values ('user1','$2y$12$TY3lMdKzS.JI308lBfQ9hOF8YCBPiXfyIahlCSbl96/bg6kyRtKtG','user1@example.com');

insert into sys_role (role_name) values ('ADMIN');
insert into sys_user_role (user_id,role_id) values(1,1);

insert into sys_role (role_name) values ('role1');
insert into sys_role (role_name) values ('role2');
insert into sys_role (role_name) values ('role3');
insert into sys_role (role_name) values ('role4');