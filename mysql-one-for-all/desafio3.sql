SELECT
    u.usuario,
    COUNT(DISTINCT h.data_reproducao) AS qtde_musicas_ouvidas,
    ROUND(SUM(c.duracao_segundos / 60), 2) AS total_minutos
FROM
    SpotifyClone.usuario u
    INNER JOIN SpotifyClone.historico h ON u.usuario_id = h.usuario_id
    INNER JOIN SpotifyClone.cancao c ON h.cancao_id = c.cancao_id
GROUP BY
    u.usuario;