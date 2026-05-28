# 🔧 Cycle Page Discount Price - FIXED

## ❌ **Problem Found:**

The cycles listing page was **not showing discount prices**:
- ✅ **Cycle Detail Page**: Shows discount prices correctly
- ❌ **Cycles Listing Page**: Only showed regular price

## 🔍 **Root Cause:**

### **Cycles Listing Page Issues:**
1. **Query Missing**: `discountPrice` field wasn't being fetched from Sanity
2. **Display Logic**: Only showed `cycle.price` without discount handling

### **Cycle Detail Page Working:**
- ✅ **Query Correct**: Fetches `discountPrice` field
- ✅ **Display Correct**: Shows strikethrough original price + discount price

## ✅ **What I Fixed:**

### **1. Updated Query in Cycles.tsx:**
```typescript
// Before (MISSING discountPrice)
const query = `*[_type == "cycle"] | order(name asc) {
  _id,
  name,
  slug,
  price,           // ❌ Only regular price
  shortDescription,
  colors,
  image
}`

// After (FIXED - Added discountPrice)
const query = `*[_type == "cycle"] | order(name asc) {
  _id,
  name,
  slug,
  price,
  discountPrice,    // ✅ Added discount field
  shortDescription,
  colors,
  image
}`
```

### **2. Updated Price Display Logic:**
```typescript
// Before (NO DISCOUNT DISPLAY)
<CyclePrice>
  {cycle.price ? (
    <>₹{cycle.price}</>
  ) : (
    <>Contact for Price</>
  )}
</CyclePrice>

// After (DISCOUNT DISPLAY WITH STRIKETHROUGH)
<CyclePrice>
  {cycle.discountPrice ? (
    <>
      <span style={{ textDecoration: 'line-through', opacity: 0.7, marginRight: '0.5rem' }}>
        ₹{cycle.price}
      </span>
      <span>₹{cycle.discountPrice}</span>
    </>
  ) : (
    <>₹{cycle.price}</>
  )}
</CyclePrice>
```

## 📊 **What You Should See Now:**

### **✅ Expected Behavior:**
- **Regular Price**: Shows `₹45000`
- **Discount Price**: Shows `₹40000` with `₹45000` strikethrough
- **No Discount**: Shows regular price without strikethrough
- **Consistent**: Both listing and detail pages show same format

### **🎯 Test This:**
1. **Go to cycles page**: `/cycles`
2. **Check cycle cards**: Should show discount prices where available
3. **Click on a cycle**: Detail page should show same discount format
4. **Verify consistency**: Both pages should match

## 📋 **Technical Details:**

### **Files Modified:**
- `src/pages/Cycles.tsx` - Fixed query and display logic

### **Changes Made:**
1. **Added `discountPrice` to Sanity query**
2. **Updated price display logic** with strikethrough effect
3. **Maintained existing styling** and responsive design

### **Sanity Schema:**
```typescript
interface Cycle {
  _id: string
  name: string
  slug: { current: string }
  price: string
  discountPrice?: string  // ✅ This field now being used
  description: string
  shortDescription?: string
  image?: any
  images?: any[]
  colors?: string[]
  specifications?: string
  inStock: boolean
  featured: boolean
}
```

## 🎉 **Result:**

Your cycle pages now work correctly:

✅ **Cycles Listing**: Shows discount prices with strikethrough
✅ **Cycle Detail**: Already was working correctly  
✅ **Consistent Display**: Both pages show same format
✅ **Professional Look**: Discount prices clearly highlighted

**The discount price display issue is now fixed!** 🚀

Users will see discounted prices on the cycles listing page with proper strikethrough formatting.
