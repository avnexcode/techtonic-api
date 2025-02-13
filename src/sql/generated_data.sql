-- Insert Categories
INSERT INTO categories (id, name, slug, description, created_at, updated_at) VALUES
('cat_monitor', 'Monitor', 'monitor', 'Berbagai pilihan monitor untuk kebutuhan gaming dan produktivitas', NOW(), NOW()),
('cat_keyboard', 'Keyboard', 'keyboard', 'Koleksi keyboard mechanical dan membrane berkualitas tinggi', NOW(), NOW()),
('cat_mouse', 'Mouse', 'mouse', 'Mouse gaming dan office dengan berbagai fitur', NOW(), NOW()),
('cat_webcam', 'Webcam', 'webcam', 'Webcam HD untuk streaming dan video conference', NOW(), NOW()),
('cat_laptop', 'Laptop', 'laptop', 'Laptop untuk gaming dan produktivitas', NOW(), NOW());

-- Insert Products
INSERT INTO products (id, name, slug, price, image, discount, description, tokopedia_link, shopee_link, tiktok_link, category_id, created_at, updated_at) VALUES
-- Monitor Products
('prod_mon1', 'LG UltraGear 27GP850-B', 'lg-ultragear-27gp850', '6999000', 'lg-27gp850.jpg', 10, '27" QHD Nano IPS Gaming Monitor with 165Hz refresh rate', 'tokopedia.com/lg-27gp850', 'shopee.com/lg-27gp850', 'tiktok.com/lg-27gp850', 'cat_monitor', NOW(), NOW()),
('prod_mon2', 'Samsung Odyssey G7', 'samsung-odyssey-g7', '8499000', 'samsung-g7.jpg', 5, '32" WQHD Curved Gaming Monitor with 240Hz refresh rate', 'tokopedia.com/samsung-g7', 'shopee.com/samsung-g7', 'tiktok.com/samsung-g7', 'cat_monitor', NOW(), NOW()),
('prod_mon3', 'ASUS TUF Gaming VG27AQ', 'asus-tuf-vg27aq', '5999000', 'asus-vg27aq.jpg', 15, '27" WQHD HDR Gaming Monitor with G-SYNC', 'tokopedia.com/asus-vg27aq', 'shopee.com/asus-vg27aq', 'tiktok.com/asus-vg27aq', 'cat_monitor', NOW(), NOW()),
('prod_mon4', 'Dell S2721DGF', 'dell-s2721dgf', '6299000', 'dell-s2721dgf.jpg', 0, '27" QHD Gaming Monitor with 165Hz refresh rate', 'tokopedia.com/dell-s2721dgf', 'shopee.com/dell-s2721dgf', 'tiktok.com/dell-s2721dgf', 'cat_monitor', NOW(), NOW()),
('prod_mon5', 'ViewSonic VX2758-2KP-MHD', 'viewsonic-vx2758', '4999000', 'viewsonic-vx2758.jpg', 20, '27" WQHD IPS Gaming Monitor with 144Hz', 'tokopedia.com/viewsonic-vx2758', 'shopee.com/viewsonic-vx2758', 'tiktok.com/viewsonic-vx2758', 'cat_monitor', NOW(), NOW()),

-- Keyboard Products
('prod_key1', 'Ducky One 3 SF', 'ducky-one-3-sf', '1899000', 'ducky-one-3.jpg', 0, '65% Hot-swappable Mechanical Keyboard', 'tokopedia.com/ducky-one-3', 'shopee.com/ducky-one-3', 'tiktok.com/ducky-one-3', 'cat_keyboard', NOW(), NOW()),
('prod_key2', 'Keychron Q1', 'keychron-q1', '2499000', 'keychron-q1.jpg', 10, '75% Custom Mechanical Keyboard with Knob', 'tokopedia.com/keychron-q1', 'shopee.com/keychron-q1', 'tiktok.com/keychron-q1', 'cat_keyboard', NOW(), NOW()),
('prod_key3', 'Royal Kludge RK84', 'rk-84', '899000', 'rk-84.jpg', 15, '75% Wireless Mechanical Keyboard', 'tokopedia.com/rk-84', 'shopee.com/rk-84', 'tiktok.com/rk-84', 'cat_keyboard', NOW(), NOW()),
('prod_key4', 'Leopold FC660M', 'leopold-fc660m', '1699000', 'leopold-fc660m.jpg', 5, '65% Premium Mechanical Keyboard', 'tokopedia.com/leopold-fc660m', 'shopee.com/leopold-fc660m', 'tiktok.com/leopold-fc660m', 'cat_keyboard', NOW(), NOW()),
('prod_key5', 'Varmilo VA87M', 'varmilo-va87m', '1799000', 'varmilo-va87m.jpg', 0, 'TKL Mechanical Keyboard with Cherry MX Switch', 'tokopedia.com/varmilo-va87m', 'shopee.com/varmilo-va87m', 'tiktok.com/varmilo-va87m', 'cat_keyboard', NOW(), NOW()),

-- Mouse Products
('prod_mou1', 'Logitech G Pro X Superlight', 'logitech-gpx', '1799000', 'logitech-gpx.jpg', 10, 'Ultra-lightweight Wireless Gaming Mouse', 'tokopedia.com/logitech-gpx', 'shopee.com/logitech-gpx', 'tiktok.com/logitech-gpx', 'cat_mouse', NOW(), NOW()),
('prod_mou2', 'Razer Viper Ultimate', 'razer-viper-ultimate', '1999000', 'razer-viper.jpg', 15, 'Wireless Gaming Mouse with Charging Dock', 'tokopedia.com/razer-viper', 'shopee.com/razer-viper', 'tiktok.com/razer-viper', 'cat_mouse', NOW(), NOW()),
('prod_mou3', 'Zowie EC2', 'zowie-ec2', '999000', 'zowie-ec2.jpg', 0, 'Ergonomic Gaming Mouse for FPS Games', 'tokopedia.com/zowie-ec2', 'shopee.com/zowie-ec2', 'tiktok.com/zowie-ec2', 'cat_mouse', NOW(), NOW()),
('prod_mou4', 'Pulsar Xlite V2', 'pulsar-xlite-v2', '899000', 'pulsar-xlite.jpg', 5, 'Lightweight Wireless Gaming Mouse', 'tokopedia.com/pulsar-xlite', 'shopee.com/pulsar-xlite', 'tiktok.com/pulsar-xlite', 'cat_mouse', NOW(), NOW()),
('prod_mou5', 'Endgame Gear XM1r', 'endgame-xm1r', '799000', 'endgame-xm1r.jpg', 20, 'Professional Gaming Mouse with PAW3370 Sensor', 'tokopedia.com/endgame-xm1r', 'shopee.com/endgame-xm1r', 'tiktok.com/endgame-xm1r', 'cat_mouse', NOW(), NOW()),

-- Webcam Products
('prod_web1', 'Logitech C922 Pro', 'logitech-c922-pro', '1499000', 'logitech-c922.jpg', 10, '1080p Webcam for Streaming and Content Creation', 'tokopedia.com/logitech-c922', 'shopee.com/logitech-c922', 'tiktok.com/logitech-c922', 'cat_webcam', NOW(), NOW()),
('prod_web2', 'Razer Kiyo Pro', 'razer-kiyo-pro', '2499000', 'razer-kiyo-pro.jpg', 15, 'USB Camera with Adaptive Light Sensor', 'tokopedia.com/razer-kiyo', 'shopee.com/razer-kiyo', 'tiktok.com/razer-kiyo', 'cat_webcam', NOW(), NOW()),
('prod_web3', 'Elgato Facecam', 'elgato-facecam', '2999000', 'elgato-facecam.jpg', 5, 'Professional USB-C Webcam for Content Creators', 'tokopedia.com/elgato-facecam', 'shopee.com/elgato-facecam', 'tiktok.com/elgato-facecam', 'cat_webcam', NOW(), NOW()),
('prod_web4', 'AVerMedia PW313', 'avermedia-pw313', '799000', 'avermedia-pw313.jpg', 0, '1080p Webcam with Privacy Shutter', 'tokopedia.com/avermedia-pw313', 'shopee.com/avermedia-pw313', 'tiktok.com/avermedia-pw313', 'cat_webcam', NOW(), NOW()),
('prod_web5', 'OBSBOT Tiny 4K', 'obsbot-tiny-4k', '3499000', 'obsbot-tiny.jpg', 20, 'AI-Powered PTZ 4K Webcam', 'tokopedia.com/obsbot-tiny', 'shopee.com/obsbot-tiny', 'tiktok.com/obsbot-tiny', 'cat_webcam', NOW(), NOW()),

-- Laptop Products
('prod_lap1', 'ASUS ROG Zephyrus G14', 'asus-rog-g14', '21999000', 'asus-g14.jpg', 10, '14" Gaming Laptop with RTX 3060', 'tokopedia.com/asus-g14', 'shopee.com/asus-g14', 'tiktok.com/asus-g14', 'cat_laptop', NOW(), NOW()),
('prod_lap2', 'Lenovo Legion 5 Pro', 'lenovo-legion-5-pro', '19999000', 'lenovo-legion.jpg', 5, '16" Gaming Laptop with RTX 3070', 'tokopedia.com/lenovo-legion', 'shopee.com/lenovo-legion', 'tiktok.com/lenovo-legion', 'cat_laptop', NOW(), NOW()),
('prod_lap3', 'MacBook Pro M2', 'macbook-pro-m2', '24999000', 'macbook-pro.jpg', 0, '14" Laptop with M2 Pro Chip', 'tokopedia.com/macbook-pro', 'shopee.com/macbook-pro', 'tiktok.com/macbook-pro', 'cat_laptop', NOW(), NOW()),
('prod_lap4', 'Dell XPS 15', 'dell-xps-15', '25999000', 'dell-xps.jpg', 15, '15" Premium Laptop with RTX 3050 Ti', 'tokopedia.com/dell-xps', 'shopee.com/dell-xps', 'tiktok.com/dell-xps', 'cat_laptop', NOW(), NOW()),
('prod_lap5', 'Razer Blade 14', 'razer-blade-14', '27999000', 'razer-blade.jpg', 8, '14" Gaming Laptop with RTX 3080', 'tokopedia.com/razer-blade', 'shopee.com/razer-blade', 'tiktok.com/razer-blade', 'cat_laptop', NOW(), NOW());