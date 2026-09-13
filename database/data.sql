USE construmarket;

INSERT INTO user_roles (id, name) VALUES (1, 'Customer'), (2, 'Admin');

INSERT INTO users (id, first_name, last_name, email, phone, password, image, role_id) VALUES
(1, 'amet consectetuer', 'nec sem', 'efalconertaylor0@miibeian.gov.cn', NULL, '$2b$10$Q3Qr6rVul.Pp7t16awdd7eDRF0gtrGZ/criNM2ytwWxCz23H8kzTW', '/images/construmarket-logo.png', 1),
(2, 'ipsum primis', 'et commodo', 'efloch1@gizmodo.com', NULL, '$2b$10$B50hPDIm1gcHy73saztQq.0yfU4qqSWGilkPLkwDS69PSZHQTtAMy', '/images/construmarket-logo.png', 2),
(3, 'lorem', 'porttitor id', 'cshewsmith2@twitpic.com', NULL, '$2b$10$w3aZ9gLY3nMOcUSEATqaYOivPOLzsrkuMC57.DiXU2MkRUudVvWCy', '/images/construmarket-logo.png', 2),
(4, 'risus semper', 'lacus', 'mdrable3@fema.gov', NULL, '$2b$10$5FutF/JkuAK5pViDCkMV3.Rz2M/OLbAef3bZy8jd2iwjuYnBPzmwK', '/images/construmarket-logo.png', 2),
(5, 'mi', 'dolor quis', 'dyegorkin4@friendfeed.com', NULL, '$2b$10$im3xwXZsewS10q/YS8PzQuS9uFJL0wOEApgdgxQvtS0h58kfZhm0W', '/images/construmarket-logo.png', 2),
(6, 'curae', 'nulla nunc', 'pwoodfin5@youtube.com', NULL, '$2b$10$KsL.5k3J23wNiqityEwM4.WQrexEzMSSI4oJ/v6Gv.LDTaqBb4SkG', '/images/construmarket-logo.png', 2),
(7, 'massa', 'a libero', 'bescott6@unesco.org', NULL, '$2b$10$KT3jXbB8BJ4jNZKNonexfuhdB4iPpSSf9JbFjdpuqPoKWo1ucZpeG', '/images/construmarket-logo.png', 2),
(8, 'orci', 'bibendum felis', 'jdohr7@friendfeed.com', NULL, '$2b$10$lg1bT6IJQjRFNVXSEoUCwONjZH/tY20lPpJIqh/fD00NJnTRw2SP.', '/images/construmarket-logo.png', 1),
(9, 'turpis eget', 'morbi', 'hbretton8@multiply.com', NULL, '$2b$10$Z5kwp9hvyxTai3hzSBgUs.9FRCnq2/lmTHLCLu9cvX3LegvmwFbv2', '/images/construmarket-logo.png', 1),
(10, 'et', 'diam erat', 'lmomery9@yandex.ru', NULL, '$2b$10$MUzDwdcemIOCtYc5oaNvp.NmzzwoxpG3gMc9IjWnzTuo54Vc0b3u.', '/images/construmarket-logo.png', 2),
(11, 'Toto', 'Bodean', 'toto@bodean.com.ar', '3454236820', '$2b$10$CQVOmjNr50vFl/7kaz6xVeCumj4kQ6VANiV49SrN589AkciLRgFJ6', '/images/construmarket-logo.png', 1);

INSERT INTO categories (id, name) VALUES
(1, 'Materiales'), (2, 'Herramientas'), (3, 'Pinturas'), (4, 'Hierros');

INSERT INTO brands (id, name) VALUES
(1, 'Loma Negra'), (2, 'CORMELA'), (3, 'Nortool'), (4, 'ACINDAR'), (5, 'TYROLIT');

INSERT INTO colors (id, name) VALUES
(1, 'Terracota'), (2, 'Amarillo'), (3, 'Negro'), (4, 'Acero');

INSERT INTO products (id, name, description, image, price, stock, category_id, brand_id) VALUES
(1, 'Cemento Portland 25 kg', 'Cemento Portland compuesto CPC40 para trabajos de construcción, albañilería y reparación. Ofrece muy buena resistencia y trabajabilidad.', 'cemento.jpg', 9000, 48, 1, 1),
(2, 'Ladrillo hueco 12 x 18 x 33 cm', 'Ladrillo cerámico liviano con buena aislación térmica, ideal para paredes interiores y exteriores.', 'ladrillo.jpg', 1250, 130, 1, 2),
(3, 'Amoladora angular 850 W', 'Amoladora compacta y potente con disco de 115 mm y empuñadura lateral para cortes y desbastes.', 'amoladora.jpg', 84990, 7, 2, 3),
(5, 'Taladro percutor 700 W', 'Taladro eléctrico con velocidad variable, mandril de 13 mm, función reversa y modo percutor.', 'taladro.jpg', 96300, 16, 2, 3),
(6, 'Hierro redondo liso 10 mm', 'Barra maciza de acero de 10 mm para herrería, refuerzos y trabajos generales de obra.', '1788486776210-605359111.jpg', 18750, 82, 4, 4),
(7, 'PLASTICOR cemento de albañilería x 25 kg.', '', '1788486277960-259924126.jpg', 8200, 100, 1, 1),
(8, 'Disco de Corte 2 en 1 Secur Extra TYROLIT 114 x 1,0 x 22,23', 'Diseñado para el corte de planchuelas, chapas, perfiles, tubos de acero y fundición.', '1788486540665-563868540.jpeg', 5000, 5, 1, 5);

INSERT INTO product_colors (product_id, color_id) VALUES
(2, 1), (3, 2), (3, 3), (5, 2), (5, 3), (6, 4);
