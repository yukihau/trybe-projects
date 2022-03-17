SELECT
  c.cancao AS cancao,
  COUNT(DISTINCT h.data_reproducao) AS reproducoes
FROM
  SpotifyClone.cancao AS c
  INNER JOIN SpotifyClone.historico AS h ON c.cancao_id = h.cancao_id
GROUP BY
  c.cancao
ORDER BY
  reproducoes DESC,
  c.cancao ASC
LIMIT
  2;