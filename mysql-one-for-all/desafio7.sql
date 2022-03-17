SELECT
  ar.artista AS artista,
  al.album AS album,
  COUNT(fa.usuario_id) AS seguidores
FROM
  SpotifyClone.album al
  INNER JOIN SpotifyClone.artista ar ON al.artista_id = ar.artista_id
  INNER JOIN SpotifyClone.artistas_favoritos fa ON al.artista_id = fa.artista_id
GROUP BY
  al.album_id
ORDER BY
  seguidores DESC,
  artista ASC,
  album ASC;