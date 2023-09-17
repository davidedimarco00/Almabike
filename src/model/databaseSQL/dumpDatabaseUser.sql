/* In questo file sono presenti le query eseguite per il riempimento del database degli user */


/*query che associa ad ogni utente una bici*/ 
INSERT INTO users_bike(codBicicletta, username)
SELECT
  b.codBicicletta,
  u.username
FROM
  bike b
INNER JOIN
  (SELECT username, ROW_NUMBER() OVER (ORDER BY (SELECT NULL)) AS row_num FROM users) u
ON
  b.codBicicletta % 50 + 1 = u.row_num

/*Analogamente alla query precedente, questa query associa una bicicletta ad un sensore*/

INSERT INTO bike_device(codBicicletta, deviceName)
SELECT
  b.codBicicletta,
  d.Name
FROM
  bike b
INNER JOIN
  (SELECT Name, ROW_NUMBER() OVER (ORDER BY (SELECT NULL)) AS row_num FROM devices) d
ON
  b.codBicicletta % 50 + 1 = d.row_num


/*query di riempimento delle bici*/

INSERT INTO bike (codBicicletta, Name)
VALUES 
  (1, 'Bike - 1'),
  (2, 'Bike - 2'),
  (3, 'Bike - 3'),
  (4, 'Bike - 4'),
  (5, 'Bike - 5'),
  (6, 'Bike - 6'),
  (7, 'Bike - 7'),
  (8, 'Bike - 8'),
  (9, 'Bike - 9'),
  (10, 'Bike - 10'),
  (11, 'Bike - 11'),
  (12, 'Bike - 12'),
  (13, 'Bike - 13'),
  (14, 'Bike - 14'),
  (15, 'Bike - 15'),
  (16, 'Bike - 16'),
  (17, 'Bike - 17'),
  (18, 'Bike - 18'),
  (19, 'Bike - 19'),
  (20, 'Bike - 20'),
  (21, 'Bike - 21'),
  (22, 'Bike - 22'),
  (23, 'Bike - 23'),
  (24, 'Bike - 24'),
  (25, 'Bike - 25'),
  (26, 'Bike - 26'),
  (27, 'Bike - 27'),
  (28, 'Bike - 28'),
  (29, 'Bike - 29'),
  (30, 'Bike - 30'),
  (31, 'Bike - 31'),
  (32, 'Bike - 32'),
  (33, 'Bike - 33'),
  (34, 'Bike - 34'),
  (35, 'Bike - 35'),
  (36, 'Bike - 36'),
  (37, 'Bike - 37'),
  (38, 'Bike - 38'),
  (39, 'Bike - 39'),
  (40, 'Bike - 40'),
  (41, 'Bike - 41'),
  (42, 'Bike - 42'),
  (43, 'Bike - 43'),
  (44, 'Bike - 44'),
  (45, 'Bike - 45'),
  (46, 'Bike - 46'),
  (47, 'Bike - 47'),
  (48, 'Bike - 48'),
  (49, 'Bike - 49'),
  (50, 'Bike - 50');


/*query di riempimento degli users, la ppssword è criptata in md5*/

INSERT INTO users (cognome, email, nome, password, username)
VALUES
('Rossi', 'mario.rossi@example.com', 'Mario', 'b2e2857610a3d64796cc63f09fbcfbf5', 'mario.rossi'),
('Bianchi', 'luca.bianchi@example.com', 'Luca', 'eb047e074ca8cb062c8db971c94a544c', 'luca.bianchi'),
('Neri', 'giovanni.neri@example.com', 'Giovanni', '6a18955653edabfe1a6900281dc2dee6', 'giovanni.neri'),
('Russo', 'giulia.russo@example.com', 'Giulia', '7f4b9042e04824a457c5f4a9927ef963', 'giulia.russo'),
('Ferrari', 'francesco.ferrari@example.com', 'Francesco', '27dc40743509adc2a5c3a063cba5f046', 'francesco.ferrari'),
('Esposito', 'paolo.esposito@example.com', 'Paolo', 'ae7ac6dc12da2ecc85d8a65a0d5a31a9', 'paolo.esposito'),
('Rizzo', 'anna.rizzo@example.com', 'Anna', '775b6c97b3a987f89e6aafdcc4d58e59', 'anna.rizzo'),
('Moretti', 'simone.moretti@example.com', 'Simone', '1881956c772137deced23d569ac8e9cd', 'simone.moretti'),
('Barbieri', 'valentina.barbieri@example.com', 'Valentina', '98e517deedc50c46de5198df596c8fbe', 'valentina.barbieri'),
('Conti', 'marco.conti@example.com', 'Marco', '8b554ed138005410a56821272d4b2486', 'marco.conti'),
('Grasso', 'serena.grasso@example.com', 'Serena', 'f2b7ca1ec0b9deef3e0848fa56ef0368', 'serena.grasso'),
('Lombardi', 'giorgio.lombardi@example.com', 'Giorgio', 'ec74202bd32c2854c7fd365815f6a021', 'giorgio.lombardi'),
('Parisi', 'roberta.parisi@example.com', 'Roberta', '478742174db0899927014a092e0f63a5', 'roberta.parisi'),
('Fabbri', 'fabio.fabbri@example.com', 'Fabio', '1d1f6149fa03fedf31b1620af80aa38a', 'fabio.fabbri'),
('Greco', 'elena.greco@example.com', 'Elena', '0671d764e10e94e39f24e10a077f1978', 'elena.greco'),
('Bianco', 'paolo.bianco@example.com', 'Paolo', 'e49bc83445862f70c742d65d9c8fa512', 'paolo.bianco'),
('Bruno', 'marco.bruno@example.com', 'Marco', 'd052f04c81bb146634080b698f93a13a', 'marco.bruno'),
('Grasso', 'laura.grasso@example.com', 'Laura', '3be579966d1926db912689e2eaddbf1a', 'laura.grasso'),
('Ricci', 'claudio.ricci@example.com', 'Claudio', '64915920beeb2603af689a15ae5a732b', 'claudio.ricci'),
('Giordano', 'roberta.giordano@example.com', 'Roberta', 'f959a1564ba7709a4fd8679d25e55fe0', 'roberta.giordano'),
('Conte', 'paola.conte@example.com', 'Paola', 'b7dddf0695206be27de2dcb063059f65', 'paola.conte'),
('Fabbri', 'lorenzo.fabbri@example.com', 'Lorenzo', '0fc3ec519c91303be269a4559cf7d5c4', 'lorenzo.fabbri'),
('Lombardi', 'elisa.lombardi@example.com', 'Elisa', 'e2fadd5f87d744f9329a12c7c84e9922', 'elisa.lombardi'),
('Santoro', 'andrea.santoro@example.com', 'Andrea', 'a64d6e4f65738cc7e26458cde5029681', 'andrea.santoro'),
('Riva', 'ilaria.riva@example.com', 'Ilaria', '9befd33bb0ae98d6c0af825b635adbbc', 'ilaria.riva'),
('Longo', 'antonella.longo@example.com', 'Antonella', '2ffff7e33ee258afbd761567d34ba763', 'antonella.longo'),
('Serra', 'fabrizio.serra@example.com', 'Fabrizio', 'd283500c31b588b146c8660e03395d99', 'fabrizio.serra'),
('Marchetti', 'paola.marchetti@example.com', 'Paola', '77382e538e1908b7cb88268e165f93e8', 'paola.marchetti'),
('Messina', 'giovanni.messina@example.com', 'Giovanni', 'd143f7a610e705dcce07a786227dea18', 'giovanni.messina'),
('Parisi', 'laura.parisi@example.com', 'Laura', '9b57d7b76b7b75697cb0837a557f7b05', 'laura.parisi'),
('Verdi', 'marco.verdi@example.com', 'Marco', '3339db318783d99607de8cf21b37df99', 'marco.verdi'),
('Ricci', 'andrea.ricci@example.com', 'Andrea', 'dc38a4f529b390feecf189d45516adb1', 'andrea.ricci'),
('Gallo', 'francesca.gallo@example.com', 'Francesca', 'cc479585e4f8d63ba5f4cd2810c3f8c1', 'francesca.gallo'),
('Lombardo', 'giovanna.lombardo@example.com', 'Giovanna', 'd369e959d676a6db83d326791c289472', 'giovanna.lombardo'),
('Ferraro', 'giuseppe.ferraro@example.com', 'Giuseppe', '35991d4e9c50f2f3318d04f6769db1df', 'giuseppe.ferraro'),
('Santoro', 'valeria.santoro@example.com', 'Valeria', 'c0cb52e5838ae848b0068d653e9b44f9', 'valeria.santoro'),
('Morelli', 'marta.morelli@example.com', 'Marta', '1ae26a08c9f48a79a4add069d0e4b70f', 'marta.morelli'),
('Rossetti', 'stefano.rossetti@example.com', 'Stefano', '4376d801a184697661835313bdc28bc6', 'stefano.rossetti'),
('Gatti', 'silvia.gatti@example.com', 'Silvia', '9b2c4fa4622ab0c10c19f6b45cdda79d', 'silvia.gatti'),
('Vitale', 'luigi.vitale@example.com', 'Luigi', '3bd8cec57219ed15fa79cc5a23339837', 'luigi.vitale'),
('Messina', 'alessandra.messina@example.com', 'Alessandra', '0877a50537a87c9d18e2f1706975f13d', 'alessandra.messina'),
('Guerriero', 'paola.guerriero@example.com', 'Paola', 'c2487ff75a0af8b9b49b07d16b6c3c2d', 'paola.guerriero'),
('Ruggiero', 'andrea.ruggiero@example.com', 'Andrea', '3c63c68ab3694075f6a081a77b69f23b', 'andrea.ruggiero'),
('Longo', 'caterina.longo@example.com', 'Caterina', 'cf9566dcead78caa83318c341048d605', 'caterina.longo'),
('Ferri', 'antonio.ferri@example.com', 'Antonio', 'c15eb2781aee6e99de867b04f09c8382', 'antonio.ferri'),
('Bianchi', 'paolo.bianchi@example.com', 'Paolo', '42e77ed7f2478c3a55e889bc27bf3018', 'paolo.bianchi'),
('Esposito', 'giuseppe.esposito@example.com', 'Giuseppe', '15da68488461fe6392ba987c5a940821', 'giuseppe.esposito'),
('Rizzo', 'simone.rizzo@example.com', 'Simone', 'ca49c7009fb8ab69e0f81950f7793240', 'simone.rizzo'),
('Conti', 'andrea.conti@example.com', 'Andrea', 'e741737006f0dc90a3ff5632de714d93', 'andrea.conti'),
('Moretti', 'giuseppe.moretti@example.com', 'Giuseppe', '4cfd805400d363e595bb31b195112dc5', 'giuseppe.moretti');



/*Query di creazione delle tabelle nuove oltre a readings e devices già impostate di default*/


/*UTENTE -> BIKE*/

CREATE TABLE bike_device (
  id INT PRIMARY KEY AUTO_INCREMENT,
  codBicicletta INT(3),
  devicesName VARCHAR(5),
  FOREIGN KEY (codBicicletta) REFERENCES bike(codBicicletta),
  FOREIGN KEY (devicesName) REFERENCES devices(Name)
);

/*BIKE -> UTENTE*/

CREATE TABLE bike_user (
  id INT PRIMARY KEY AUTO_INCREMENT,
  codBicicletta INT(3),
  username VARCHAR(50),
  FOREIGN KEY (codBicicletta) REFERENCES bike(codBicicletta),
  FOREIGN KEY (username) REFERENCES users(username)
);