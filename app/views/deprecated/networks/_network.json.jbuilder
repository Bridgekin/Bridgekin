json.extract! network, :id, :title, :subtitle

json.pictureUrl nil
json.pictureUrl url_for(network.picture) if network.picture.attached?
