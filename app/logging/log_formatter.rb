class MyAppFormatter < Logger::Formatter
  # def call(severity, time, progname, msg)
  #   %Q | {time: "#{datetime}\n", severity: "#{severity}\n", message: "#{msg} from #{progname}"}\n |
  # end

  # def call(severity, time, progname, msg = '')
  #   return '' if msg.blank?
  #
  #   if progname.present?
  #     return "timestamp='#{time}' level=#{severity} progname='#{progname}' message='#{msg}'}\n"
  #   end
  #
  #   "timestamp='#{time}' level=#{severity} source_class=#{source_class} message='#{msg}'\n"
  # end

  # def call(severity, time, progname, msg)
  #   formatted_severity = sprintf("%-5s",severity.to_s)
  #   formatted_time = time.strftime("%Y-%m-%d %H:%M:%S")
  #   "[#{formatted_severity} #{formatted_time} #{$}] : #{progname} #{msg}\n"
  # end

  private

  def processed_message(msg)
    return msg.map { |k, v| "#{k}='#{v.strip}'" }.join(' ') if msg.is_a?(Hash)

    "message='#{msg.strip}'"
  end

  # def source_class
  #   binding.of_caller(STACK_LEVEL).eval('self').class.to_s
  # rescue StandardError
  #   'unknown'
  # end
end
