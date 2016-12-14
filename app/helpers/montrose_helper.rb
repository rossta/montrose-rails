# frozen_string_literal: true
module MontroseHelper
  def montrose_select_tag(method, content = "")
    content_tag(:label, content, class: "montrose-select") +
      hidden_field_tag("#{method}_json")
  end
end

class ActionView::Helpers::FormBuilder
  def montrose_select(method, content = "")
    @template.content_tag(:label, content, class: "montrose-select") +
      @template.hidden_field(@object_name, "#{method}_json")
  end
end
