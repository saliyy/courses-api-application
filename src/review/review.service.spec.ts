import { Test, TestingModule } from '@nestjs/testing';
import { ReviewService } from './review.service';
import {getModelToken} from 'nestjs-typegoose';
import {Types} from 'mongoose';
import {CreateReviewDto} from './dto/create-review.dto';

describe('ReviewService', () => {
  let service: ReviewService;

  const exec =  { exec: jest.fn() };
  const create = jest.fn();
  const reviewRepo = () => ({
	  find: () => exec,
	  create
  });

  beforeEach(async () => {
	const module: TestingModule = await Test.createTestingModule({
		providers: [
			ReviewService,
			{
				useFactory: reviewRepo, provide: getModelToken('ReviewModel')
			}
		],
	}).compile();

	service = module.get<ReviewService>(ReviewService);
  });

  it('should be defined', () => {
	expect(service).toBeDefined();
  });


  it ('should return productId', async () => {
	 const mockProductId = new Types.ObjectId().toHexString();
	 console.log(new Types.ObjectId().toHexString());
	 reviewRepo().find().exec.mockReturnValueOnce([{productId: mockProductId}]);
	 const res = await service.findByProductId(mockProductId);
	 expect(res[0].productId).toBe(mockProductId);
  });


  it ('should create review', async() => {
	  const mockDto: CreateReviewDto = {
		  name: 'Test',
		  title: 'test title',
		  description: 'Desc',
		  rating: 5,
		  productId: new Types.ObjectId().toHexString()
	  };

	   reviewRepo().create.mockReturnValueOnce(mockDto);

	   const res = await service.create(mockDto);

	   expect(res).toEqual(mockDto);
  });
});
