-- ============================================================
-- PROG2002 Assignment 2: Charity Events Database
-- Database: charityevents_db
-- ============================================================

DROP DATABASE IF EXISTS charityevents_db;
CREATE DATABASE charityevents_db;
USE charityevents_db;

-- ============================================================
-- Table 1: charity_orgs
-- ============================================================
CREATE TABLE charity_orgs (
    org_id          INT AUTO_INCREMENT PRIMARY KEY,
    org_name        VARCHAR(200) NOT NULL,
    mission         TEXT,
    welcome_text    TEXT,
    contact_email   VARCHAR(100),
    contact_phone   VARCHAR(50),
    address         VARCHAR(300),
    logo_url        VARCHAR(500) DEFAULT 'images/default-org.png',
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- Table 2: categories
-- ============================================================
CREATE TABLE categories (
    category_id     INT AUTO_INCREMENT PRIMARY KEY,
    category_name   VARCHAR(100) NOT NULL,
    description     TEXT
);

-- ============================================================
-- Table 3: events
-- status: active = upcoming, ended = past, disabled = removed
-- ============================================================
CREATE TABLE events (
    event_id        INT AUTO_INCREMENT PRIMARY KEY,
    event_name      VARCHAR(200) NOT NULL,
    description     TEXT,
    event_date      DATETIME NOT NULL,
    location        VARCHAR(300) NOT NULL,
    category_id     INT,
    org_id          INT,
    ticket_price    DECIMAL(10,2) DEFAULT 0.00,
    fundraising_goal DECIMAL(12,2) DEFAULT 0.00,
    amount_raised   DECIMAL(12,2) DEFAULT 0.00,
    image_url       VARCHAR(500) DEFAULT 'images/default-event.jpg',
    status          ENUM('active','ended','disabled') DEFAULT 'active',
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(category_id),
    FOREIGN KEY (org_id) REFERENCES charity_orgs(org_id)
);

-- ============================================================
-- Insert charity organization
-- ============================================================
INSERT INTO charity_orgs (org_name, mission, welcome_text, contact_email, contact_phone, address)
VALUES (
    'HopeBridge Foundation',
    'HopeBridge Foundation is a non-profit organization dedicated to connecting compassionate communities with meaningful causes. We believe every event, every donation, and every volunteer hour creates a bridge of hope to those in need.',
    'Welcome to HopeBridge Foundation. Since 2015, we have been organising charity events that bring communities together to support vital causes. From fun runs to gala dinners, our events raise funds and awareness for education, healthcare, and environmental sustainability. Join us in making a difference - one event at a time.',
    'contact@hopebridge.org.au',
    '+61 2 9999 8888',
    '123 Community Street, Sydney, NSW 2000, Australia'
);

-- ============================================================
-- Insert categories
-- ============================================================
INSERT INTO categories (category_name, description) VALUES
('Fun Run', 'Charity running and walking events for all fitness levels'),
('Gala Dinner', 'Elegant evening fundraising dinners with auctions and entertainment'),
('Silent Auction', 'Online or in-person silent auctions supporting good causes'),
('Charity Concert', 'Live music performances raising funds for community projects'),
('Charity Walk', 'Community walking events promoting health and goodwill');

-- ============================================================
-- Insert 8 sample events
-- ============================================================

-- Event 1: Upcoming Fun Run
INSERT INTO events (event_name, description, event_date, location, category_id, org_id, ticket_price, fundraising_goal, amount_raised, image_url, status)
VALUES (
    'Spring Hope Run 2026',
    'Join us for our flagship Spring Hope Run! Participants can choose between a 5km fun run or a 10km competitive run along the beautiful Sydney Harbour foreshore. All registration fees go directly to funding after-school programs for underprivileged children. The event includes a complimentary t-shirt, post-event breakfast, and a medal for all finishers. Every step you take brings hope to a child in need.',
    '2026-10-18 07:00:00',
    'The Rocks, Sydney NSW',
    1, 1,
    45.00, 50000.00, 18500.00,
    'images/fun-run-spring.jpg',
    'active'
);

-- Event 2: Upcoming Gala Dinner
INSERT INTO events (event_name, description, event_date, location, category_id, org_id, ticket_price, fundraising_goal, amount_raised, image_url, status)
VALUES (
    'Stars of Hope Gala Dinner 2026',
    'An unforgettable evening of elegance and philanthropy. The Stars of Hope Gala Dinner features a three-course gourmet meal, live entertainment from renowned local artists, and a live auction with exclusive items including holiday getaways and signed memorabilia. Formal attire required. All proceeds support medical research for rare childhood diseases. Tables of 10 available for corporate sponsors.',
    '2026-11-07 18:30:00',
    'Westin Grand Ballroom, Sydney',
    2, 1,
    180.00, 150000.00, 42000.00,
    'images/gala-dinner-stars.jpg',
    'active'
);

-- Event 3: Upcoming Charity Concert
INSERT INTO events (event_name, description, event_date, location, category_id, org_id, ticket_price, fundraising_goal, amount_raised, image_url, status)
VALUES (
    'Harmony for Hope Charity Concert',
    'An evening of beautiful music featuring the Sydney Community Orchestra and guest vocal soloists. The program includes classical favourites and contemporary works, all performed by talented local musicians. Ticket sales support music education programs in regional schools. Doors open at 6:30pm, concert begins at 7:30pm. Light refreshments included.',
    '2026-10-25 19:30:00',
    'Sydney Conservatorium of Music',
    4, 1,
    35.00, 25000.00, 8200.00,
    'images/concert-harmony.jpg',
    'active'
);

-- Event 4: Upcoming Silent Auction
INSERT INTO events (event_name, description, event_date, location, category_id, org_id, ticket_price, fundraising_goal, amount_raised, image_url, status)
VALUES (
    'Art for Hearts Silent Auction',
    'Bid on exquisite artworks donated by emerging and established Australian artists. The silent auction runs online for two weeks, culminating in a viewing evening at the gallery where guests can enjoy wine and canapes while placing final bids. 100% of sale prices go to supporting art therapy programs for mental health patients. Registration is free; bids start at $50.',
    '2026-10-10 18:00:00',
    'Glebe Gallery, Sydney NSW',
    3, 1,
    0.00, 30000.00, 12400.00,
    'images/auction-art.jpg',
    'active'
);

-- Event 5: Upcoming Charity Walk
INSERT INTO events (event_name, description, event_date, location, category_id, org_id, ticket_price, fundraising_goal, amount_raised, image_url, status)
VALUES (
    'Coastal Pathway Charity Walk',
    'A scenic 8km coastal walk from Bondi to Coogee, suitable for all ages and fitness levels. Participants are encouraged to seek sponsorship from friends and family. The walk raises funds for homelessness support services. Registration includes a walk map, snack pack, and access to the post-walk celebration at Coogee Pavilion. Free for children under 12.',
    '2026-11-14 08:00:00',
    'Bondi Beach, Sydney NSW',
    5, 1,
    25.00, 40000.00, 9600.00,
    'images/walk-coastal.jpg',
    'active'
);

-- Event 6: Already ended
INSERT INTO events (event_name, description, event_date, location, category_id, org_id, ticket_price, fundraising_goal, amount_raised, image_url, status)
VALUES (
    'Winter Warmth Run 2026',
    'A winter morning run through the Royal Botanic Gardens. All proceeds funded winter clothing drives for people experiencing homelessness. Participants received a beanie and hot chocolate after the run.',
    '2026-06-21 07:30:00',
    'Royal Botanic Garden, Sydney',
    1, 1,
    35.00, 30000.00, 32500.00,
    'images/run-winter.jpg',
    'ended'
);

-- Event 7: Already ended
INSERT INTO events (event_name, description, event_date, location, category_id, org_id, ticket_price, fundraising_goal, amount_raised, image_url, status)
VALUES (
    'Spring Garden Soiree 2025',
    'An elegant garden party in the Botanic Gardens featuring high tea, live jazz, and a mini-auction. Funds raised supported community garden projects across Western Sydney.',
    '2025-09-20 14:00:00',
    'Royal Botanic Garden, Sydney',
    2, 1,
    95.00, 20000.00, 21800.00,
    'images/garden-soiree.jpg',
    'ended'
);

-- Event 8: Disabled
INSERT INTO events (event_name, description, event_date, location, category_id, org_id, ticket_price, fundraising_goal, amount_raised, image_url, status)
VALUES (
    'Unapproved Lucky Draw Event',
    'This event has been removed due to policy violations. It is shown here only for database completeness and must not appear on the website.',
    '2026-12-01 10:00:00',
    'Unknown Venue',
    3, 1,
    10.00, 5000.00, 0.00,
    'images/default-event.jpg',
    'disabled'
);
