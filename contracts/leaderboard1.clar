(define-map leaderboard { id: int } { name: (string-ascii 12), score: uint })

(define-public (set-player (id int) (name (string-ascii 12)) (score uint))
  (begin
    (map-insert leaderboard { id: id } { name: name, score: score })
    (ok true)))

(define-read-only (get-top-five-scores)
  (let ((keys (list u1 u2 u3 u4 u5 u6 u7 u8 u9 u10))) ;; assuming you know the keys or they are sequential
    (fold get-top-five (map get-score keys) (list u0 u0 u0 u0 u0)))
    )

(define-private (list-set (lst (list 5 uint)) (idx uint) (value uint))
  (if (is-eq idx u0)
    (cons value (rest lst))
    (cons (first lst) (list-set (rest lst) (- idx u1) value))))

(define-public (get-top-five (top-five (list 5 uint)) (score uint))
  (let ((min-score (unwrap-panic (get-min top-five))))
    (if (> score min-score)
      (list-set top-five (index-of min-score top-five) score)
      top-five)))

(define-private (get-min (scores (list 5 uint)))
  (fold min scores u0))

(define-private (min (a uint) (b uint))
  (if (< a b) a b))