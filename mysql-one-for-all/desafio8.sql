SELECT
  ar.artista AS artista,
  al.album AS album
FROM
  SpotifyClone.album al
  INNER JOIN SpotifyClone.artista ar ON al.artista_id = ar.artista_id
WHERE ar.artista = 'Walter Phoenix'
GROUP BY al.album_id
ORDER BY album ASC;