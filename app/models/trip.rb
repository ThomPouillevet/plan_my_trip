class Trip < ApplicationRecord
  has_many :user_trips
  # has_many :branches, dependent: :destroy
  has_many :users, through: :user_trips
  has_many :events

  belongs_to :user

  validates :user_id, presence: true
  validates :name, presence: true
  validates :start_date, presence: true
  validates :end_date, presence: true
  validates :start_location, presence: true
  validates :end_location, presence: true
  # validates :photo, presence: true

  mount_uploader :photo, PhotoUploader

   def calendar
    c = Icalendar::Calendar.new
    c.append_custom_property("NAME", name)
    c.append_custom_property("X-WR-CALNAME", name)

    events.each do |point|
      c.add_event event(point)
    end
    c
  end

  def event(point)
    # transformation du point du chemin en event ical
    event = Icalendar::Event.new
    event.dtstart = Icalendar::Values::Date.new(point.date)
    event.dtend = Icalendar::Values::Date.new(point.date)
    event.summary = point.name
    event.description = point.description
    event.location = point.location
    event.ip_class = "PUBLIC" # Ne pas changer
    return event
  end
end
