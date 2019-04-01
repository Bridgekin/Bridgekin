module SQLControllerModule
  def connected_with_connection
    subject =

    body =

    {
      subject: subject,
      body: body
    }
  end

  def connected_no_connection
  end
end
