DROP TABLE IF EXISTS friendship;

CREATE TABLE friendship(
    sender_id BIGINT REFERENCES users(id) NOT NULL,
    recipient_id BIGINT REFERENCES users(id) NOT NULL,
    accepted BOOLEAN DEFAULT false NOT NULL,
    CHECK(sender_id != recipient_id)
);
CREATE UNIQUE INDEX idx_friendship ON friendship
(LEAST(sender_id, recipient_id), GREATEST(sender_id, recipient_id));
