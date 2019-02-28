# @opp_permissions.each do |opp_permission|
#   json.set! opp_permission.id do
#     json.partial! 'api/opp_permissions/permission',
#     opp_permission: opp_permission
#   end
# end

json.constructedPerms @constructed_perms
