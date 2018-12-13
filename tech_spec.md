# Database Schema

## users

column name| data type | details
------------------|-----------|-------------
`id`              | integer   | not null, primary key
`username`        | string    | not null
`email`           | string    | not null
`name`            | string    | not null
`phone`           | string    |
`city`            | string    |
`state`           | string    |
`country`         | string    |
`password_digest` | string    | not null
`session_token`   | string    | not null
`admin_status`    | boolean   | not null, default: false
`membership_type` | boolean   | not null, default: 'full'
`email_sent_at`   | date      |
`email_confirmed_at` | date   |
`created_at`      | date      | not null
`updated_at`      | date      | not null

- #user has many networks (networks)
- #user owns many opportunities (opportunity)
- #user has many connections to other users
- #user has many facilitated opportunities (connected opportunities)
- #user has many facilitated deals (finalized opportunities)
- #user has many referral links (connected opportunities)

## waitlist_users

column name| data type | details
------------------|-----------|-------------
`id`              | integer   | not null, primary key
`email`           | string    | not null
`name`            | string    | not null
`email_sent_at`   | date      |
`from_referral`   | string    |
`created_at`      | date      | not null
`updated_at`      | date      | not null


## networks

column name| data type | details
------------------|-----------|-------------
`id`              | integer   | not null, primary key
`title`           | string    | not null
`created_at`      | date      | not null
`updated_at`      | date      | not null

- #network has many user_networks
- #network has many users through user_networks
- #network has many network_admins
- #network has many admins through network_admins
- #network has many referral links
- #network has many sources through referral links


## network_admins

column name| data type | details
------------------|-----------|-------------
`id`              | integer   | not null, primary key
`network_id`      | integer   | not null
`user_id`         | integer   | not null
`created_at`      | date      | not null
`updated_at`      | date      | not null

- #network_admins belong to admins
- #network_admins belong to networks

## user_networks

column name| data type | details
------------------|-----------|-------------
`id`              | integer   | not null, primary key
`user_id`         | integer   | not null
`network_id`      | integer   | not null
`created_at`      | date      | not null
`updated_at`      | date      | not null

- #user_networks belongs to many users
- #user_networks belongs to many networks


## connections

column name| data type | details
------------------|-----------|-------------
`id`              | integer   | not null, primary key
`user_1`          | string    | not null
`user_2`          | integer   | not null
`created_at`      | date      | not null
`updated_at`      | date      | not null

- #connection belongs to user
- Uniqueness constraint on user_1 and user_2

## opportunities

column name| data type | details
--------------------|-----------|-------------
`id`                | integer   | not null, primary key
`owner_id`          | integer   | not null
`title`             | string    | not null
`description`       | string    | not null
`opportunity_needs` | string    | not null
`industries`        | string    | not null, array: true
`geography`         | string    | not null, array: true
`value`             | string    | not null
`status`            | string    | not null, default: 'Open'
`created_at`        | date      | not null
`updated_at`        | date      | not null

- #opportunity has many potential connections (connected opportunities)
- #opportunity has many associations (member associations)
- #opportunity has one finalized connection (finalized opportunities)
- #opportunity has one owner (user)
- #opportunity has many saved opportunities (saved opportunities/likes)

## opportunity_networks

column name| data type | details
--------------------|-----------|-------------
`id`                | integer   | not null, primary key
`opportunity_id`    | integer   | not null
`network_id`        | integer   | not null

- #opportunity_netowork belongs to opportunity
- #opportunity_netowork belongs to network
- Uniqueness constraint on user_1 and user_2

## connected_opportunities

column name| data type | details
------------------|-----------|-------------
`id`              | integer   | not null, primary key
`opportunity_id`  | integer   | not null
`user_id`         | integer   | not null
`facilitator_id`  | integer   |
`network_id`      | integer   |
`created_at`      | date      | not null
`updated_at`      | date      | not null

- #connected opportunity belongs to user
- #connected opportunity belongs to opportunity
- #connected opportunity belongs to facilitator
- #connected opportunity belongs to owner through opportunity
- Uniqueness constraint on user_id, opportunity_id

## finalized_opportunities

column name| data type | details
------------------|-----------|-------------
`id`              | integer   | not null, primary key
`opportunity_id`  | integer   | not null
`user_id`         | integer   | not null
`facilitator_id`  | integer   |
`network_id`      | integer   |
`created_at`      | date      | not null
`updated_at`      | date      | not null

- #finalized opportunity belongs to user
- #finalized opportunity belongs to opportunity
- #finalized opportunity belongs to facilitator
- #finalized opportunity belongs to owner through opportunity
- Uniqueness constraint on user_id, opportunity_id

## saved_opportunities

column name| data type | details
------------------|-----------|-------------
`id`              | integer   | not null, primary key
`opportunity_id`  | integer   | not null
`user_id`         | integer   | not null
`network_id`      | integer   |
`created_at`      | date      | not null
`updated_at`      | date      | not null

- #saved opportunity belongs to user
- #saved opportunity belongs to opportunity
- #saved opportunity belongs to owner through opportunity
- Uniqueness constraint on user_id, opportunity_id

## referral_links

We'll create referral links using a 'referred_by' param, which will just be the user's id. When the user signs up, we'll write to this db to track that a referral happened.

column name| data type | details
------------------|-----------|-------------
`id`              | integer   | not null, primary key
`referee_id`      | integer   | not null
`referrer_id`     | integer   | not null
`referrer_type`   | string   | not null
`created_at`      | date      | not null
`updated_at`      | date      | not null

- #referral_link belong to source user
- #referral_link belong to association
