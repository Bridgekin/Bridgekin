json.extract! site_template, :id, :name, :network_id, :test_feature

json.navLogo url_for(site_template.nav_logo) if site_template.nav_logo.attached?
