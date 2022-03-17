SELECT
  ca.cancao AS nome,
  COUNT(hi.data_reproducao) AS reproducoes
FROM
  SpotifyClone.cancao ca
  INNER JOIN SpotifyClone.historico hi ON hi.cancao_id = ca.cancao_id
  INNER JOIN SpotifyClone.usuario us ON us.usuario_id = hi.usuario_id
WHERE us.plano_id = 1 OR us.plano_id = 3
GROUP BY ca.cancao_id
ORDER BY nome ASC;