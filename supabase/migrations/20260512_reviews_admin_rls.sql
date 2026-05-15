-- ============================================================
-- CollegePune — Reviews: Admin moderation RLS fix
-- Allows service role to SELECT all reviews (including pending)
-- for the admin moderation panel
-- ============================================================

-- Drop and recreate service_write to explicitly cover SELECT too
DROP POLICY IF EXISTS "reviews_service_write" ON public.college_reviews;

-- Service role: full access to all reviews regardless of status
CREATE POLICY "reviews_service_all"
  ON public.college_reviews FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Also update college rating + review_count automatically when a review is approved
CREATE OR REPLACE FUNCTION public.sync_college_rating()
RETURNS TRIGGER AS $$
DECLARE
  v_slug text;
  v_avg  numeric;
  v_cnt  integer;
BEGIN
  -- Determine which college slug changed
  v_slug := COALESCE(NEW.college_slug, OLD.college_slug);

  -- Recalculate avg rating and count from approved reviews
  SELECT
    ROUND(AVG(rating)::numeric, 1),
    COUNT(*)
  INTO v_avg, v_cnt
  FROM public.college_reviews
  WHERE college_slug = v_slug AND status = 'approved';

  -- Update the colleges table (only if the college exists there)
  UPDATE public.colleges
  SET
    rating       = COALESCE(v_avg, rating),
    review_count = v_cnt,
    updated_at   = now()
  WHERE slug = v_slug;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS sync_rating_on_review ON public.college_reviews;
CREATE TRIGGER sync_rating_on_review
  AFTER INSERT OR UPDATE OF status OR DELETE ON public.college_reviews
  FOR EACH ROW EXECUTE FUNCTION public.sync_college_rating();
