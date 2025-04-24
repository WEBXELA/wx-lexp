import axios from 'axios';
import { SearchFiltersState, Profile, SearchResponse } from '../types';

const GOOGLE_API_KEY = 'AIzaSyDOojV79DnbYOkkhgxZXa_nZzq_8WUcNNI';
const SEARCH_ENGINE_ID = '45949347f8b954cf9';
const RESULTS_PER_PAGE = 10;

function extractProfileUrl(url: string): string {
  // Remove any parameters or fragments from the URL
  const baseUrl = url.split('?')[0].split('#')[0];
  
  // Ensure URL ends with the profile path
  if (!baseUrl.includes('/in/')) {
    return url;
  }
  
  // Extract the profile path
  const profilePath = baseUrl.split('/in/')[1];
  return `https://www.linkedin.com/in/${profilePath}`;
}

function extractImage(item: any): string {
  // Try different possible image sources
  const possibleImages = [
    item.pagemap?.metatags?.[0]?.['twitter:image'], // Open Graph image
    item.pagemap?.cse_image?.[0]?.src,         // Custom search engine image
    item.pagemap?.imageobject?.[0]?.url        // Image object URL
  ];
  
  // // Return the first valid image URL
  const profileImage = possibleImages.find(img => img && img.startsWith('http'));
  console.log(profileImage)
  
  // // If no valid profile image is found, return an empty string
  return profileImage || '';
}

function extractTitle(title: string): { fullName: string; position: string; company: string } {
  const parts = title.split(' - ').map(part => part.trim());
  const position = parts[1] || '';
  const currentPosition = position.replace('| LinkedIn', '').trim();
  return {
    fullName: parts[0] || '',
    position: currentPosition,
    company: parts[2] || ''
  };
}

export async function searchProfiles(filters: SearchFiltersState): Promise<SearchResponse> {
  try {
    const startIndex = (filters.page - 1) * RESULTS_PER_PAGE + 1;
    const query = `site:linkedin.com/in/ ${filters.jobTitle || ''} ${filters.location || ''} ${filters.industry || ''} ${filters.companySize || ''} ${filters.company || ''} ${filters.skills || ''} ${filters.languages || ''}`.trim();
    
    const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
      params: {
        key: GOOGLE_API_KEY,
        cx: SEARCH_ENGINE_ID,
        q: query,
        num: RESULTS_PER_PAGE,
        start: startIndex
      }
    });

    if (!response.data?.items) {
      return {
        items: [],
        totalResults: 0,
        currentPage: filters.page,
        totalPages: 0
      };
    }

    const profiles: Profile[] = response.data.items.map((item: any) => {
      const { fullName, position, company } = extractTitle(item.title || '');
      const profileUrl = extractProfileUrl(item.link);
      const imageUrl = extractImage(item);

      return {
        title: item.title || '',
        link: profileUrl,
        snippet: item.snippet || '',
        fullName,
        currentPosition: position,
        company,
        education: item.pagemap?.education || [], // Extract education details if available
        location: item.pagemap?.metatags?.[0]?.['locale'] || 'Unknown Location', // Extract location if available
        followers: 0,
        connectionDegree: '',
        about: item.pagemap?.metatags?.[0]?.['og:description'] || 'No description available',
        profileImageUrl: imageUrl,
        certification: item.pagemap?.certifications || [], // Add certifications if available
        skills: item.pagemap?.skills || [], // Add skills if available
        phoneNumber: item.pagemap?.contact?.[0]?.phone || 'N/A' // Add phone number if available
      };
    });

    const totalResults = Math.min(response.data.searchInformation?.totalResults || 0, 100);
    const totalPages = Math.ceil(totalResults / RESULTS_PER_PAGE);

    return {
      items: profiles,
      totalResults,
      currentPage: filters.page,
      totalPages
    };
  } catch (error) {
    console.error('Search profiles error:', error);
    return {
      items: [],
      totalResults: 0,
      currentPage: filters.page,
      totalPages: 0
    };
  }
}