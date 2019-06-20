json.sales_intros do
  @sales_intros.each do |sales_intro|
    json.set! sales_intro.id do
      json.partial! 'api/sales_intros/sales_intro', sales_intro: sales_intro
    end
  end
end