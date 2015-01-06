json.array!(@items) do |item|
  json.extract! item, :id, :code, :description, :sale, :cost, :stock, :rank
  json.url item_url(item, format: :json)
end
