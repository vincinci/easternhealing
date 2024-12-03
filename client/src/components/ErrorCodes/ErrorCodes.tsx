import React, { useState, useMemo } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Chip,
  useTheme,
  IconButton,
  Tooltip,
  InputAdornment,
  Collapse,
  Alert,
  Pagination,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Info as InfoIcon,
  Clear as ClearIcon,
} from '@mui/icons-material';
import { errorCodes, ErrorCode } from './errorCodesData';

const ROWS_PER_PAGE = 10;

const ErrorCodes: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [showInfo, setShowInfo] = useState(true);
  const theme = useTheme();

  const categories = useMemo(() => {
    const uniqueCategories = new Set(errorCodes.map(error => error.category));
    return ['all', ...Array.from(uniqueCategories)].sort();
  }, []);

  const filteredErrors = useMemo(() => {
    return errorCodes.filter(error => {
      const matchesSearch = error.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          error.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          error.statusCode.toString().includes(searchQuery);
      const matchesCategory = categoryFilter === 'all' || error.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, categoryFilter]);

  const paginatedErrors = useMemo(() => {
    const startIndex = (page - 1) * ROWS_PER_PAGE;
    return filteredErrors.slice(startIndex, startIndex + ROWS_PER_PAGE);
  }, [filteredErrors, page]);

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategoryFilter(event.target.value);
    setPage(1);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setPage(1);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setCategoryFilter('all');
    setPage(1);
  };

  const getStatusCodeColor = (statusCode: number) => {
    if (statusCode < 400) return theme.palette.success.main;
    if (statusCode < 500) return theme.palette.warning.main;
    return theme.palette.error.main;
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      Function: theme.palette.primary.main,
      Internal: theme.palette.error.main,
      Deployment: theme.palette.info.main,
      DNS: theme.palette.warning.main,
      Routing: theme.palette.success.main,
      Request: theme.palette.secondary.main,
      Image: theme.palette.info.dark,
      Cache: theme.palette.warning.dark,
      Runtime: theme.palette.error.dark,
    };
    return colors[category] || theme.palette.grey[500];
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Collapse in={showInfo}>
        <Alert 
          severity="info" 
          sx={{ mb: 2 }}
          onClose={() => setShowInfo(false)}
        >
          This reference includes common Vercel deployment error codes. Use the search to find specific errors or filter by category.
        </Alert>
      </Collapse>

      <Box sx={{ 
        display: 'flex', 
        gap: 2, 
        mb: 3,
        flexDirection: { xs: 'column', sm: 'row' }
      }}>
        <TextField
          label="Search"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ flexGrow: 1 }}
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            endAdornment: searchQuery && (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={() => setSearchQuery('')}
                >
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          placeholder="Search by code, category, or status"
        />
        
        <FormControl sx={{ minWidth: { xs: '100%', sm: 200 } }} size="small">
          <InputLabel>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <FilterIcon fontSize="small" />
              Category
            </Box>
          </InputLabel>
          <Select
            value={categoryFilter}
            label=" Category"
            onChange={handleCategoryChange}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {(searchQuery || categoryFilter !== 'all') && (
          <Tooltip title="Clear all filters">
            <IconButton 
              onClick={clearFilters}
              size="small"
              sx={{ alignSelf: 'center' }}
            >
              <ClearIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      <TableContainer component={Paper} sx={{ 
        maxHeight: 440,
        boxShadow: theme.shadows[2],
        '& .MuiTableCell-root': {
          px: 2,
          py: 1.5,
        },
        mb: 2
      }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell 
                sx={{ 
                  fontWeight: 'bold', 
                  bgcolor: theme.palette.grey[50],
                  borderBottom: `2px solid ${theme.palette.grey[200]}`
                }}
              >
                Error Code
              </TableCell>
              <TableCell 
                sx={{ 
                  fontWeight: 'bold', 
                  bgcolor: theme.palette.grey[50],
                  borderBottom: `2px solid ${theme.palette.grey[200]}`
                }}
              >
                Category
              </TableCell>
              <TableCell 
                sx={{ 
                  fontWeight: 'bold', 
                  bgcolor: theme.palette.grey[50],
                  borderBottom: `2px solid ${theme.palette.grey[200]}`
                }}
              >
                Status Code
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedErrors.map((error: ErrorCode) => (
              <TableRow 
                key={error.code}
                hover
                sx={{ 
                  '&:last-child td, &:last-child th': { border: 0 },
                  '&:hover': { bgcolor: theme.palette.grey[50] }
                }}
              >
                <TableCell 
                  component="th" 
                  scope="row" 
                  sx={{ 
                    fontFamily: 'monospace',
                    fontWeight: 'medium',
                    color: theme.palette.text.primary
                  }}
                >
                  <Tooltip title="Copy error code" arrow>
                    <Box 
                      sx={{ 
                        cursor: 'pointer',
                        '&:hover': { color: theme.palette.primary.main }
                      }}
                      onClick={() => navigator.clipboard.writeText(error.code)}
                    >
                      {error.code}
                    </Box>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={error.category}
                    size="small"
                    sx={{
                      bgcolor: getCategoryColor(error.category),
                      color: 'white',
                      fontWeight: 'medium'
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Chip 
                    label={error.statusCode}
                    size="small"
                    sx={{
                      bgcolor: getStatusCodeColor(error.statusCode),
                      color: 'white',
                      fontWeight: 'bold'
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: 2
      }}>
        <Typography variant="caption" color="text.secondary">
          Showing {paginatedErrors.length} of {filteredErrors.length} error codes
          {filteredErrors.length !== errorCodes.length && ` (filtered from ${errorCodes.length} total)`}
        </Typography>
        
        <Pagination 
          count={Math.ceil(filteredErrors.length / ROWS_PER_PAGE)}
          page={page}
          onChange={(_, value) => setPage(value)}
          color="primary"
          size="small"
        />
      </Box>
    </Box>
  );
};

export default ErrorCodes;
