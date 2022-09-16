CREATE TABLE t_commodity
(
    `id`             int          NOT NULL AUTO_INCREMENT,
    `tenant_id`      int,
    `shop_name`      varchar(100) NOT null,
    `price`          varchar(15)  NOT null,
    `url`            varchar(200),
    `pic`            varchar(200),
    `id_of_platform` varchar(20),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4;


