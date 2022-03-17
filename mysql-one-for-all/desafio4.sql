SELECT
  u.usuario AS usuario,
  CASE
    WHEN MAX(YEAR(h.data_reproducao)) >= 2021 THEN 'Usuário ativo'
    ELSE 'Usuário inativo'
  END AS condicao_usuario
FROM
  SpotifyClone.usuario u
  INNER JOIN SpotifyClone.historico h ON u.usuario_id = h.usuario_id
GROUP BY
  u.usuario
ORDER BY
  u.usuario ASC;