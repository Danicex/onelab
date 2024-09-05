class ProductsController < ApplicationController
  before_action :set_product, only: %i[show update destroy]
  before_action :set_current_seller, only: %i[create index]

  def index
    if params[:q].present?
      search
    elsif
      @products = if params[:category]
                    @seller.products.where(category: params[:category]).order(created_at: :desc)
                  else
                    @seller.products.order(created_at: :desc)
                  end
    else
      @products =  Product.all
      render json: { products: @products }
    end

  end

  def show
    render json: @product
  end

  def create
    @product = @seller.products.build(product_params)

    if @product.save
      attach_image if params[:product][:image].present?
      render json: @product, status: :created
    else
      render json: @product.errors, status: :unprocessable_entity
    end
  end

  def update
    if @product.update(product_params)
      attach_image if params[:product][:image].present?
      render json: @product
    else
      render json: @product.errors, status: :unprocessable_entity
    end
  end

  def all_products
    @products = Product.order(created_at: :desc)
    render json: { products: @products }
  end

  def by_seller
    @products = Product.where(seller_id: params[:seller_id]).order(created_at: :desc)
    render json: { products: @products }
  end

  def by_category
    @products = Product.where(category: params[:category]).order(created_at: :desc)
    render json: { products: @products }
  end

  def search
    query = params[:q]
    @products = @seller.products.where('name LIKE ? OR description LIKE ?', "%#{query}%", "%#{query}%")

    if @products.any?
      render json: { products: @products }
    else
      render json: { message: 'No products found' }, status: :not_found
    end
  end
  def destroy
    @product.destroy!
    head :no_content
  end

  private

  def set_product
    @product = Product.find(params[:id])
  end

  def set_current_seller
    @seller = Seller.find(params[:seller_id])
  end

  def product_params
    params.require(:product).permit(:name, :category, :price, :description, :delivery_time, :quantity, :seller_id, :image, :currency)
  end

  def attach_image
    @product.image.attach(params[:product][:image])
    @product.update(image_url: rails_blob_url(@product.image))
  end

  
  
end
