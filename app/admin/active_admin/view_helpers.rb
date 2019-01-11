module ActiveAdmin::ViewHelpers
  def needs_choices
    ['Find',
      'Sell',
      'Raise Capital',
      'Invest Capital',
      'Discover',
      'Other']
  end

  def industry_choices
    ['Agriculture & Forestry',
      'Blockchain',
      'Cannabis',
      'Construction & Utilities',
      'Consumer Goods',
      'Education',
      'Entertainment',
      'Finance & Insurance',
      'Food & Hospitality',
      'Health Services',
      'Media',
      'Natural Resources & Environment',
      'Other',
      'Professional & Business Services',
      'Real Estate',
      'Technology & Internet',
      'Telecommunications',
      'Transporation']
  end

  def geography_choices
    [  'Worldwide',
      'Africa',
      'Central America',
      'Eastern Europe',
      'Middle East',
      'North America',
      'Oceania',
      'South America',
      'Western Europe']
  end

  def value_choices
    [  'Under 1M',
      '$1M - $5M',
      '$5M - $25M',
      'Over $25M']
  end
end
