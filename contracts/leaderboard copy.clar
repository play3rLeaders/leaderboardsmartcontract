(define-map leaderboard  { id: int } 
  { name: (string-ascii 12), score: uint } )

(define-public (set-player (id int) (name (string-ascii 12)) (score uint))
  (begin
    (map-insert leaderboard { id: id } { name: name, score: score })
    (ok true)))

(define-data-var top1 (optional) none)
(map-get? score (var-get top1))