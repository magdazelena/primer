import { generateUniqueSKU } from "../sku-generator";

describe("generateUniqueSKU", () => {
  let strapi;
  let mockQuery;

  beforeEach(async function () {
    // Create a mock query function that can be configured for different scenarios
    mockQuery = jest.fn();
    
    strapi = {
      db: {
        query: mockQuery,
      },
    };
  });

  it("should generate a unique SKU", async () => {
    // Mock the fetchHighestSKU call
    mockQuery.mockReturnValueOnce({
      findOne: jest.fn().mockResolvedValue({
        sku: "SKU10000",
      }),
    });
    
    // Mock the isSKUUnique call - return null to indicate SKU is unique
    mockQuery.mockReturnValueOnce({
      findOne: jest.fn().mockResolvedValue(null),
    });

    const sku = await generateUniqueSKU(strapi);
    expect(sku).toBeDefined();
    expect(sku.length).toBeGreaterThan(0);
    expect(sku).toMatch(/^SKU\d+$/);
  });

  it("should generate SKU10001 when highest SKU is SKU10000", async () => {
    // Mock the fetchHighestSKU call
    mockQuery.mockReturnValueOnce({
      findOne: jest.fn().mockResolvedValue({
        sku: "SKU10000",
      }),
    });
    
    // Mock the isSKUUnique call - return null to indicate SKU is unique
    mockQuery.mockReturnValueOnce({
      findOne: jest.fn().mockResolvedValue(null),
    });

    const sku = await generateUniqueSKU(strapi);
    expect(sku).toBe("SKU10001");
  });

  it("should generate SKU10000 when no products exist", async () => {
    // Mock the fetchHighestSKU call - return null for no existing products
    mockQuery.mockReturnValueOnce({
      findOne: jest.fn().mockResolvedValue(null),
    });
    
    // Mock the isSKUUnique call - return null to indicate SKU is unique
    mockQuery.mockReturnValueOnce({
      findOne: jest.fn().mockResolvedValue(null),
    });

    const sku = await generateUniqueSKU(strapi);
    expect(sku).toBe("SKU10000");
  });

  it("should throw an error when the highest SKU is not a number", async () => {
    // Mock the fetchHighestSKU call - return null for no existing products
    mockQuery.mockReturnValueOnce({
      findOne: jest.fn().mockResolvedValue({
        sku: "SKUXYZ",
      }),  
    });

    await expect(generateUniqueSKU(strapi)).rejects.toThrow("SKU SKUXYZ is not a number");
  });
  it('should throw an error if the SKU is not unique', async () => {
    // Mock the fetchHighestSKU call - return null for no existing products
    mockQuery.mockReturnValueOnce({
      findOne: jest.fn().mockResolvedValue({
        sku: "SKU10001",
      }), 
    });
    mockQuery.mockReturnValueOnce({
      findOne: jest.fn().mockResolvedValue({
        sku: "SKU10001",
      }), 
    });

    await expect(generateUniqueSKU(strapi)).rejects.toThrow("SKU SKU10002 is not unique");
  });
  it('should generate a unique SKU every time', async () => {
    const iterations = 100;

    const skus = [];
    for (let i = 0; i < iterations; i++) {
      mockQuery.mockReturnValueOnce({
        findOne: jest.fn().mockResolvedValue({
          sku: `SKU${i}`,
        }),
      });
      mockQuery.mockReturnValueOnce({
        findOne: jest.fn().mockResolvedValue(null),
      });
      const sku = await generateUniqueSKU(strapi);
      skus.push(sku);
    }
    const uniqueSkus = [...new Set(skus)];
    expect(uniqueSkus.length).toBe(iterations);
  });
});