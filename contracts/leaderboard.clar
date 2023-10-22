(define-map leaderboard  { id: int } 
  { name: (string-ascii 12), score: uint } )

(define-map top-scores { rank: uint } { id: int })


(define-public (set-player (id int) (name (string-ascii 12)) (score uint))
  (begin
    (map-insert leaderboard { id: id } { name: name, score: score })
    (ok true)))

(define-public (set-top-score (rank uint) (id int))
  (begin
    (map-insert top-scores { rank: rank } { id: id })
    (ok true)))

(define-read-only (get-top-scores)
  (list
    (map-get? leaderboard (unwrap-panic (map-get? top-scores { rank: u1 })))
    (map-get? leaderboard (unwrap-panic (map-get? top-scores { rank: u2 })))
    (map-get? leaderboard (unwrap-panic (map-get? top-scores { rank: u3 })))
    (map-get? leaderboard (unwrap-panic (map-get? top-scores { rank: u4 })))
    (map-get? leaderboard (unwrap-panic (map-get? top-scores { rank: u5 })))
  ))