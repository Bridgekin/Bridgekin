class RefQuestions < ActiveRecord::Migration[5.2]
  def change
    add_column :ref_applications, :question_1, :string
    rename_column :ref_applications, :description, :answer_1
  end
end
