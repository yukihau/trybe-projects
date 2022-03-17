SELECT
	COUNT(DISTINCT ca.cancao_id) AS cancoes,
	COUNT(DISTINCT ar.artista_id) AS artistas,
	COUNT(DISTINCT al.album_id) AS albuns
FROM
	SpotifyClone.cancao ca
	INNER JOIN SpotifyClone.album al ON ca.album_id = al.album_id
	INNER JOIN SpotifyClone.artista ar ON al.artista_id = ar.artista_id;