class TripsController < ApplicationController
  before_action :set_trip, only: [:show]

  def index
    @trips = Trip.all
  end

  def new
    @trip = Trip.new
  end

  def create
    @trip = Trip.new(trip_params)
    @trip.user = current_user
    if @trip.save
      @start = Event.new(name: "Start", category: "settings", date: @trip.start_date, location: @trip.start_location, trip_id: @trip.id, duration: 1, master: true)
      @start.save!
      @end = Event.new(name: "End", category: "settings", date: @trip.end_date, location: @trip.end_location, trip_id: @trip.id, duration: 1, master: true)
      @end.save!
      Relationship.create!(parent_id: @start.id, child_id: @end.id)
      redirect_to trip_path(@trip)
    else
      render :new
    end
  end

  def show
    @event_show = Event.all[3]
    @event = Event.new
    @trip = Trip.find(params[:id])
    @events_parents = Event.where(trip_id: @trip.id).where(id: Relationship.pluck(:parent_id))
    @events_children = Event.where(trip_id: @trip.id).where(id: Relationship.pluck(:child_id))

    # Envoie des datas au JS de Cytoscape
    @relationships = Relationship.where(parent: @trip.events)
    @array_relationships = []
    @array_nodes = []
    hash_relationship = {}
    hash_nodes = {}
    @relationships.each do |relationship|
      hash_relationship[:child_id] = Event.find(relationship.child_id).id
      hash_relationship[:child_name] = Event.find(relationship.child_id).name
      hash_relationship[:parent_id] = Event.find(relationship.parent_id).id
      hash_relationship[:parent_name] = Event.find(relationship.parent_id).name
      @array_relationships << hash_relationship
      hash_relationship = {}
      unless @array_nodes.include?(relationship.child_id)
        hash_nodes[:id] = Event.find(relationship.child_id).id
        hash_nodes[:name] = Event.find(relationship.child_id).name
        @array_nodes << hash_nodes
        hash_nodes = {}
      end
    end

    # Afficher les events masters dans le récapitulatif
    @events_master = Event.where(trip_id: @trip.id).where(master: true).order(:date)

    # Pour afficher sur la trip-show la map avec des points sur chaque event
    @map_events = Event.where.not(latitude: nil, longitude: nil)
    @markers = @map_events.map do |event|
      {
        lat: event.latitude,
        lng: event.longitude#,
        # infoWindow: { content: render_to_string(partial: "/flats/map_box", locals: { flat: flat }) }
      }
    end
  end

  private

  def set_trip
    @trip = Trip.find(params[:id])
  end

  def trip_params
    params.require(:trip).permit(:name, :start_date, :end_date, :start_location, :end_location, :photo)
  end
end
