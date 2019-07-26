require 'rails_helper'

RSpec.describe SalesCompany, type: :model do
  describe "sales_company" do
    describe "build_sales_company" do
      before(:all) do
        @sales_company = create(:sales_company)
      end

      it "finds an existing company" do
        result = SalesCompany.build_sales_company(@sales_company.title)
        expect(result.id).to eq(@sales_company.id)
      end

      it "creates and existing company if one isn't found" do
        result = SalesCompany.build_sales_company(@sales_company.title + "1")

        expect(result.id).to be_truthy
        expect(result.id).not_to eq(@sales_company.id)
      end

    end
  end
end