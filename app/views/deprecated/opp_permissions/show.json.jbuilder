json.opp_permission do |json|
  json.partial! 'api/opp_permissions/permission',
  opp_permission: opp_permission
end
