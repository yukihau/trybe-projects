SELECT
  COUNT(hi.data_reproducao) AS quantidade_musicas_no_historico
FROM
  SpotifyClone.historico hi
  INNER JOIN SpotifyClone.usuario us ON hi.usuario_id = us.usuario_id
WHERE us.usuario = 'Bill';