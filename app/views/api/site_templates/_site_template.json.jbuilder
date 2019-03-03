json.extract! site_template, :id, :name, :network_id, :test_feature,
  :base1, :base2, :base3, :base4, :font1, :font2, :button1, :button2,
  :border1, :border2

json.navLogo url_for(site_template.nav_logo) if site_template.nav_logo.attached?
